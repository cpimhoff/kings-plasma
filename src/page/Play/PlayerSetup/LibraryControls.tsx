import { memo, useMemo, useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from '@/components/ui/slider';
import { usePlayerSetupStore } from './store';
import { useLibraryControlsStore, Rank, PowerRange, SortAttribute, SortDirection, SortMethod } from './LibraryControlsStore';

const LibraryControls = memo(() => {
    const {
        rankFilters,
        powerRange,
        sortMethod,
        toggleRankFilter,
        setPowerRange,
        setSortMethod,
    } = useLibraryControlsStore();

    const serializeSortMethod = useCallback((sortMethod: SortMethod) => {
        const { attribute, direction } = sortMethod;
        return `${attribute}|${direction}`;
    }, []);

    const sortOptions = useMemo(() => {
        return ['index', 'rank', 'power'].map((attribute) => {
            return ['ascending', 'descending'].map((direction) => {
                const method = {
                    attribute: attribute as SortAttribute,
                    direction: direction as SortDirection,
                };
                return {
                    method,
                    value: serializeSortMethod(method),
                    label: `${attribute} (${direction})`,
                };
            });
        }).reduce((accum, curr) => [...accum, ...curr]);
    }, []);

    const cardLibrary = usePlayerSetupStore((s) => s.cardLibrary);
    const maxPower = useMemo(() => {
        return cardLibrary.reduce((accum, curr) => {
        return Math.max(accum, curr.power);
        }, 0);
    }, [cardLibrary]);
    const translatedPowerRange = useMemo(() => {
        const right = powerRange[1] === -1 ? maxPower : powerRange[1];
        return [powerRange[0], right];
    }, [powerRange, maxPower]);

    return (
        <div className="flex gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="outline">Filter</Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-60">
                    <div>
                        <DropdownMenuLabel><b>Rank</b></DropdownMenuLabel>
                        { (Object.keys(rankFilters) as Array<Rank>).map((rank) => (
                            <DropdownMenuCheckboxItem
                                key={rank}
                                checked={rankFilters[rank]}
                                onCheckedChange={() => toggleRankFilter(rank)}
                            >
                                { rank }
                            </DropdownMenuCheckboxItem>
                        ))}
                    </div>
                    <div>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel><b>Power (0-{maxPower})</b></DropdownMenuLabel>
                        <div className="flex">
                            <span className="mx-2"> { translatedPowerRange[0]} </span>
                            <Slider
                                min={0}
                                max={maxPower}
                                step={1}
                                value={translatedPowerRange}
                                onValueChange={(value) => setPowerRange(value as PowerRange)}
                            />
                            <span className="mx-2"> { translatedPowerRange[1] } </span>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="outline">Sort</Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-60">
                    <DropdownMenuRadioGroup
                        value={serializeSortMethod(sortMethod)}
                        onValueChange={(newValue) => {
                            const [ attribute, direction ] = newValue.split('|');
                            setSortMethod({
                                attribute,
                                direction,
                            } as SortMethod);
                        }}
                    >
                    { sortOptions.map((sortOption) => {
                        return (
                            <DropdownMenuRadioItem key={sortOption.value} value={sortOption.value}>{sortOption.label}</DropdownMenuRadioItem>
                        );
                    })}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
});

export default LibraryControls;